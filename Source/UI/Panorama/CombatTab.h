#pragma once

#include <GameClient/Panorama/PanoramaDropDown.h>
#include <Features/Combat/Fly/FlyConfigVariables.h>
#include "FlyFloatDropdownSelectionChangeHandler.h"
#include <EntryPoints/GuiEntryPoints.h>
#include <Platform/Macros/FunctionAttributes.h>
#include "OnOffDropdownSelectionChangeHandler.h"

template <typename HookContext>
class CombatTab {
public:
    explicit CombatTab(HookContext& hookContext) noexcept
        : hookContext{hookContext}
    {
    }

    void init(auto&& guiPanel) const
    {
        initDropDown<OnOffDropdownSelectionChangeHandler<HookContext, no_scope_inaccuracy_vis_vars::Enabled>>(guiPanel, "no_scope_inacc_vis");
        initDropDown<OnOffDropdownSelectionChangeHandler<HookContext, fly_vars::Enabled>>(guiPanel, "fly_enabled");
        initDropDown<FlyFloatDropdownSelectionChangeHandler<HookContext, fly_vars::Speed, 0>>(guiPanel, "fly_speed");
        initDropDown<FlyFloatDropdownSelectionChangeHandler<HookContext, fly_vars::VerticalSpeed, 1>>(guiPanel, "fly_vertical_speed");
        initDropDown<FlyFloatDropdownSelectionChangeHandler<HookContext, fly_vars::Acceleration, 2>>(guiPanel, "fly_acceleration");
        initDropDown<OnOffDropdownSelectionChangeHandler<HookContext, fly_vars::ShowDirectionIndicator>>(guiPanel, "fly_direction_indicator");
    }

    void updateFromConfig(auto&& mainMenu) const noexcept
    {
        setDropDownSelectedIndex(mainMenu, "no_scope_inacc_vis", !GET_CONFIG_VAR(no_scope_inaccuracy_vis_vars::Enabled));
        setDropDownSelectedIndex(mainMenu, "fly_enabled", !GET_CONFIG_VAR(fly_vars::Enabled));
        setDropDownSelectedIndex(mainMenu, "fly_speed", flySpeedIndex(GET_CONFIG_VAR(fly_vars::Speed)));
        setDropDownSelectedIndex(mainMenu, "fly_vertical_speed", flyVerticalSpeedIndex(GET_CONFIG_VAR(fly_vars::VerticalSpeed)));
        setDropDownSelectedIndex(mainMenu, "fly_acceleration", flyAccelerationIndex(GET_CONFIG_VAR(fly_vars::Acceleration)));
        setDropDownSelectedIndex(mainMenu, "fly_direction_indicator", !GET_CONFIG_VAR(fly_vars::ShowDirectionIndicator));
    }

private:
    [[nodiscard]] static int flySpeedIndex(float value) noexcept
    {
        if (value <= 150.0f) return 0;
        if (value <= 300.0f) return 1;
        if (value <= 450.0f) return 2;
        if (value <= 600.0f) return 3;
        return 4;
    }

    [[nodiscard]] static int flyVerticalSpeedIndex(float value) noexcept
    {
        if (value <= 100.0f) return 0;
        if (value <= 200.0f) return 1;
        if (value <= 300.0f) return 2;
        if (value <= 400.0f) return 3;
        return 4;
    }

    [[nodiscard]] static int flyAccelerationIndex(float value) noexcept
    {
        if (value <= 0.05f) return 0;
        if (value <= 0.10f) return 1;
        if (value <= 0.20f) return 2;
        if (value <= 0.35f) return 3;
        return 4;
    }

    template <typename Handler>
    void initDropDown(auto&& guiPanel, const char* panelId) const
    {
        auto&& dropDown = guiPanel.findChildInLayoutFile(panelId).clientPanel().template as<PanoramaDropDown>();
        dropDown.registerSelectionChangedHandler(&GuiEntryPoints<HookContext>::template dropDownSelectionChanged<Handler>);
    }

    [[NOINLINE]] void setDropDownSelectedIndex(auto&& mainMenu, const char* dropDownId, int selectedIndex) const noexcept
    {
        mainMenu.findChildInLayoutFile(dropDownId).clientPanel().template as<PanoramaDropDown>().setSelectedIndex(selectedIndex);
    }

    HookContext& hookContext;
};
