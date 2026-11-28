#pragma once

#include <cmath>
#include <Features/Common/InWorldPanels.h>
#include <Features/Common/RenderingHookEntityLoop.h>
#include <Features/Visuals/ModelGlow/ModelGlow.h>
#include <GameClient/Entities/BaseEntity.h>
#include <GameClient/Entities/BaseModelEntity.h>
#include <GameClient/Entities/PlayerPawn.h>
#include <GameClient/LocalPlayer/LocalPlayer.h>
#include <GameClient/WorldToScreen/WorldToClipSpaceConverter.h>
#include <GameClient/Panorama/PanoramaUiPanel.h>
#include <Utils/ConfigVariable.h>

#include "FlyConfigVariables.h"

template <typename HookContext>
class Fly {
public:
    explicit Fly(HookContext& hookContext) noexcept
        : hookContext{hookContext}
        , velocity{0.0f, 0.0f, 0.0f}
    {
    }

    void run() const noexcept
    {
        if (!enabled())
            return;

        auto&& localPlayer = hookContext.template make<LocalPlayer>();
        if (!localPlayer.hasValue())
            return;

        auto&& playerPawn = localPlayer.template as<PlayerPawn>();
        const auto absOrigin = playerPawn.absOrigin();
        if (!absOrigin.hasValue())
            return;

        // Get current velocity
        auto&& currentVelocity = playerPawn.velocity().valueOr(cs2::Vector{0.0f, 0.0f, 0.0f});

        // Calculate target velocity based on input
        cs2::Vector targetVelocity = calculateTargetVelocity(playerPawn, currentVelocity);

        // Smooth transition to target velocity
        velocity = lerpVelocity(currentVelocity, targetVelocity, accelerationFactor());

        // Apply velocity
        playerPawn.setVelocity(velocity);
    }

private:
    [[nodiscard]] bool enabled() const noexcept
    {
        return GET_CONFIG_VAR(fly_vars::Enabled);
    }

    [[nodiscard]] float speed() const noexcept
    {
        return GET_CONFIG_VAR(fly_vars::Speed).value_or(300.0f);
    }

    [[nodiscard]] float verticalSpeed() const noexcept
    {
        return GET_CONFIG_VAR(fly_vars::VerticalSpeed).value_or(200.0f);
    }

    [[nodiscard]] float accelerationFactor() const noexcept
    {
        return GET_CONFIG_VAR(fly_vars::Acceleration).value_or(0.1f);
    }

    [[nodiscard]] bool showDirectionIndicator() const noexcept
    {
        return GET_CONFIG_VAR(fly_vars::ShowDirectionIndicator).value_or(true);
    }

    [[nodiscard]] cs2::Vector calculateTargetVelocity(auto&& playerPawn, const cs2::Vector& currentVelocity) const noexcept
    {
        cs2::Vector target{0.0f, 0.0f, 0.0f};

        // Get forward and right vectors from player view
        const auto eyePosition = playerPawn.eyePosition().valueOr(cs2::Vector{0.0f, 0.0f, 0.0f});
        const auto forward = playerPawn.forward().valueOr(cs2::Vector{0.0f, 1.0f, 0.0f});
        const auto right = playerPawn.right().valueOr(cs2::Vector{1.0f, 0.0f, 0.0f});

        // Horizontal movement (WASD)
        if (input()->GetKeyState(VK_W))
            target += forward * speed();
        if (input()->GetKeyState(VK_S))
            target -= forward * speed();
        if (input()->GetKeyState(VK_D))
            target += right * speed();
        if (input()->GetKeyState(VK_A))
            target -= right * speed();

        // Vertical movement (Space/Shift)
        if (input()->GetKeyState(VK_SPACE))
            target.z += verticalSpeed();
        if (input()->GetKeyState(VK_SHIFT))
            target.z -= verticalSpeed();

        return target;
    }

    [[nodiscard]] cs2::Vector lerpVelocity(const cs2::Vector& from, const cs2::Vector& to, float factor) const noexcept
    {
        return cs2::Vector{
            from.x + (to.x - from.x) * factor,
            from.y + (to.y - from.y) * factor,
            from.z + (to.z - from.z) * factor
        };
    }

    [[nodiscard]] decltype(auto) input() const noexcept
    {
        return hookContext.template make<InWorldPanels>().input();
    }

    mutable HookContext& hookContext;
    mutable cs2::Vector velocity;
};