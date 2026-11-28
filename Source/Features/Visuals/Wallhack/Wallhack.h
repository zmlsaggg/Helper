#pragma once

#include <Features/Visuals/Wallhack/WallhackConfigVariables.h>

template <typename HookContext>
class Wallhack {
public:
    Wallhack(HookContext& hookContext) noexcept
        : hookContext{hookContext}
    {
    }

    void onFrame() noexcept
    {
        if (!enabled())
            return;

        auto&& playerPawn = hookContext.localPlayerController().pawn();
        if (!playerPawn)
            return;

        // Set the local player's view model to be transparent
        // This effectively removes walls from view
        // Set r_drawopaque to 0 to make walls transparent
        hookContext.cvarSystem().template setConVarValue<cs2::r_drawopaque>(0);

        // Set r_drawtransparent to 1 to draw transparent objects
        hookContext.cvarSystem().template setConVarValue<cs2::r_drawtransparent>(1);
    }

    void onFrameEnd() noexcept
    {
        if (!enabled())
            return;

        // Reset r_drawopaque to 1
        hookContext.cvarSystem().template setConVarValue<cs2::r_drawopaque>(1);

        // Reset r_drawtransparent to 0
        hookContext.cvarSystem().template setConVarValue<cs2::r_drawtransparent>(0);
    }

private:
    [[nodiscard]] bool enabled() const noexcept
    {
        return GET_CONFIG_VAR(wallhack_vars::Enabled);
    }

    HookContext& hookContext;
};
