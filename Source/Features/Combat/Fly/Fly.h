#pragma once

#include <Features/Combat/Fly/FlyConfigVariables.h>
#include <Input/Input.h>

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

        auto& input = hookContext.input();

        // Check if the fly key is being held
        if (input.isKeyDown(flyKey()))
        {
            // Set velocity to 0 to allow flying
            playerPawn.velocity().setX(0);
            playerPawn.velocity().setY(0);
            playerPawn.velocity().setZ(0);

            // Get the fly speed
            const auto speed = speedMultiplier();

            // Get movement input
            const auto forward = input.forwardInput();
            const auto right = input.rightInput();
            const auto up = input.upInput();

            // Calculate velocity based on input and speed
            playerPawn.velocity().setX(right * speed);
            playerPawn.velocity().setY(forward * speed);
            playerPawn.velocity().setZ(up * speed);
        }
    }

private:
    [[nodiscard]] bool enabled() const noexcept
    {
        return GET_CONFIG_VAR(fly_vars::Enabled);
    }

    [[nodiscard]] auto flyKey() const noexcept
    {
        return static_cast<Input::Key>(GET_CONFIG_VAR(fly_vars::FlyKey));
    }

    [[nodiscard]] auto speedMultiplier() const noexcept
    {
        return GET_CONFIG_VAR(fly_vars::SpeedMultiplier);
    }

    HookContext& hookContext;
};