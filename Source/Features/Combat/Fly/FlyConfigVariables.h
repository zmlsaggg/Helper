#pragma once

#include <Utils/ConfigVariable.h>

namespace fly_vars {
    const ConfigVariable<bool> Enabled{false, "Enabled"};
    const ConfigVariable<float> Speed{300.0f, "Speed", 100.0f, 1000.0f};
    const ConfigVariable<float> VerticalSpeed{200.0f, "Vertical Speed", 50.0f, 500.0f};
    const ConfigVariable<float> Acceleration{0.1f, "Acceleration", 0.01f, 1.0f};
    const ConfigVariable<bool> ShowDirectionIndicator{true, "Show Direction Indicator"};
}