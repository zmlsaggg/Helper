#pragma once

#include <Features/Combat/Fly/FlyConfigVariables.h>
#include <Windows.h>
#include <cmath>

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

        auto&& playerPawn = hookContext.localPlayerController().pawn();
        if (!playerPawn.hasValue())
            return;

        const auto key = flyKey();
        bool keyDown = false;

        switch (key) {
        case 0: keyDown = (GetAsyncKeyState(VK_LSHIFT) & 0x8000) || (GetAsyncKeyState(VK_RSHIFT) & 0x8000); break;
        case 1: keyDown = (GetAsyncKeyState(VK_LCONTROL) & 0x8000) || (GetAsyncKeyState(VK_RCONTROL) & 0x8000); break;
        case 2: keyDown = (GetAsyncKeyState(VK_LMENU) & 0x8000) || (GetAsyncKeyState(VK_RMENU) & 0x8000); break;
        }

        if (!keyDown)
            return;

        auto& pawn = *playerPawn.value();
        const auto speed = speedMultiplier();

        float forward = 0, right = 0, up = 0;
        if (GetAsyncKeyState('W') & 0x8000) forward = 1;
        if (GetAsyncKeyState('S') & 0x8000) forward = -1;
        if (GetAsyncKeyState('D') & 0x8000) right = 1;
        if (GetAsyncKeyState('A') & 0x8000) right = -1;
        if (GetAsyncKeyState(VK_SPACE) & 0x8000) up = 1;

        // Get the player's yaw from the view angles
        auto& playerController = hookContext.localPlayerController();
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