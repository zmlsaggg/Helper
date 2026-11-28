#pragma once

#include <Features/Combat/Fly/FlyConfigVariables.h>
#include <cmath>

#if defined(_WIN32)
#include <Windows.h>
#else
#include <dlfcn.h>
#endif

namespace fly_key {
#if defined(_WIN32)
constexpr int kLeftShift = VK_LSHIFT;
constexpr int kRightShift = VK_RSHIFT;
constexpr int kLeftControl = VK_LCONTROL;
constexpr int kRightControl = VK_RCONTROL;
constexpr int kLeftAlt = VK_LMENU;
constexpr int kRightAlt = VK_RMENU;
constexpr int kW = 'W';
constexpr int kS = 'S';
constexpr int kA = 'A';
constexpr int kD = 'D';
constexpr int kSpace = VK_SPACE;
#else
// SDL3 scancode values. The game already loads SDL3; resolve its public
// keyboard-state function at runtime so Linux builds do not need SDL headers.
constexpr int kLeftShift = 225;
constexpr int kRightShift = 229;
constexpr int kLeftControl = 224;
constexpr int kRightControl = 228;
constexpr int kLeftAlt = 226;
constexpr int kRightAlt = 230;
constexpr int kW = 26;
constexpr int kS = 22;
constexpr int kA = 4;
constexpr int kD = 7;
constexpr int kSpace = 44;
#endif
}

template <typename HookContext>
class Fly {
public:
    Fly(HookContext& hookContext) noexcept
        : hookContext{hookContext}
    {
    }

    void onFrame() noexcept
    {
        if (!enabled())
            return;

        auto playerController = hookContext.localPlayerController();
        auto&& playerPawn = playerController.pawn();
        if (!playerPawn)
            return;

        const auto key = flyKey();
        bool keyDown = false;

        switch (key) {
        case 0: keyDown = isKeyDown(fly_key::kLeftShift) || isKeyDown(fly_key::kRightShift); break;
        case 1: keyDown = isKeyDown(fly_key::kLeftControl) || isKeyDown(fly_key::kRightControl); break;
        case 2: keyDown = isKeyDown(fly_key::kLeftAlt) || isKeyDown(fly_key::kRightAlt); break;
        }

        if (!keyDown)
            return;

        auto& pawn = *playerPawn;
        const auto speed = speedMultiplier();

        float forward = 0, right = 0, up = 0;
        if (isKeyDown(fly_key::kW)) forward = 1;
        if (isKeyDown(fly_key::kS)) forward = -1;
        if (isKeyDown(fly_key::kD)) right = 1;
        if (isKeyDown(fly_key::kA)) right = -1;
        if (isKeyDown(fly_key::kSpace)) up = 1;

        // Get the player's yaw from the view angles
        float yaw = 0;
        auto* controllerPtr = reinterpret_cast<cs2::CCSPlayerController*>(&playerController);
        if (controllerPtr) {
            // m_vecViewAngles offset in CCSPlayerController
            yaw = *reinterpret_cast<float*>(reinterpret_cast<char*>(controllerPtr) + 0x108);
        }

        float cosYaw = cosf(yaw * 3.14159265f / 180.0f);
        float sinYaw = sinf(yaw * 3.14159265f / 180.0f);

        float vx = (right * cosYaw - forward * sinYaw) * speed * 300.0f;
        float vy = (right * sinYaw + forward * cosYaw) * speed * 300.0f;
        float vz = up * speed * 200.0f;

        // Write velocity directly to the pawn entity at offset 0x1B0
        auto* velocityPtr = *reinterpret_cast<float**>(reinterpret_cast<char*>(&pawn) + 0x1B0);
        if (velocityPtr) {
            velocityPtr[0] = vx;
            velocityPtr[1] = vy;
            velocityPtr[2] = vz;
        }
    }

private:
    [[nodiscard]] static bool isKeyDown(int key) noexcept
    {
#if defined(_WIN32)
        return (GetAsyncKeyState(key) & 0x8000) != 0;
#else
        using SDLGetKeyboardState = const bool* (*)(int*);
        const auto getKeyboardState = reinterpret_cast<SDLGetKeyboardState>(dlsym(RTLD_DEFAULT, "SDL_GetKeyboardState"));
        if (!getKeyboardState)
            return false;

        int keyCount = 0;
        const auto* keyboardState = getKeyboardState(&keyCount);
        return keyboardState && key >= 0 && key < keyCount && keyboardState[key];
#endif
    }

    [[nodiscard]] bool enabled() const noexcept
    {
        return GET_CONFIG_VAR(fly_vars::Enabled);
    }

    [[nodiscard]] int flyKey() const noexcept
    {
        return GET_CONFIG_VAR(fly_vars::FlyKey);
    }

    [[nodiscard]] float speedMultiplier() const noexcept
    {
        return GET_CONFIG_VAR(fly_vars::SpeedMultiplier);
    }

    HookContext& hookContext;
};
