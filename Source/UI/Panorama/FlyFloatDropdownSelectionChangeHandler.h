#pragma once

#include <HookContext/HookContextMacros.h>

template <typename HookContext, typename ConfigVariable, int Setting>
struct FlyFloatDropdownSelectionChangeHandler {
    explicit FlyFloatDropdownSelectionChangeHandler(HookContext& hookContext) noexcept
        : hookContext{hookContext}
    {
    }

    void onSelectionChanged(int selectedIndex)
    {
        if (selectedIndex < 0 || selectedIndex > 4)
            return;

        if constexpr (Setting == 0) {
            constexpr float values[] = {150.0f, 300.0f, 450.0f, 600.0f, 750.0f};
            SET_CONFIG_VAR(ConfigVariable, values[selectedIndex]);
        } else if constexpr (Setting == 1) {
            constexpr float values[] = {100.0f, 200.0f, 300.0f, 400.0f, 500.0f};
            SET_CONFIG_VAR(ConfigVariable, values[selectedIndex]);
        } else {
            constexpr float values[] = {0.05f, 0.10f, 0.20f, 0.35f, 0.50f};
            SET_CONFIG_VAR(ConfigVariable, values[selectedIndex]);
        }
    }

private:
    HookContext& hookContext;
};
