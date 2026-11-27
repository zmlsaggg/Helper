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
        if (!playerPawn.hasValue())
            return;

        // Set the local player's view model to be transparent
        // This effectively removes walls from view
        const auto& conVars = hookContext.getConVarsBase();

        // Set r_drawopaque to 0 to make walls transparent
        auto r_drawopaque = conVars.find("r_drawopaque");
        if (r_drawopaque.hasValue())
            r_drawopaque.value().set(0);

        // Set r_drawtransparent to 1 to draw transparent objects
        auto r_drawtransparent = conVars.find("r_drawtransparent");
        if (r_drawtransparent.hasValue())
            r_drawtransparent.value().set(1);
    }

    void onFrameEnd() noexcept
    {
        if (!enabled())
            return;

        auto&& conVars = hookContext.getConVarsBase();

        // Reset r_drawopaque to 1
        auto r_drawopaque = conVars.find("r_drawopaque");
        if (r_drawopaque.hasValue())
            r_drawopaque.value().set(1);

        // Reset r_drawtransparent to 0
        auto r_drawtransparent = conVars.find("r_drawtransparent");
        if (r_drawtransparent.hasValue())
            r_drawtransparent.value().set(0);
    }

private:
    [[nodiscard]] bool enabled() const noexcept
    {
        return GET_CONFIG_VAR(wallhack_vars::Enabled);
    }

    HookContext& hookContext;
};
