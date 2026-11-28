#pragma once

#include <Config/ConfigVariable.h>

namespace fly_vars
{
CONFIG_VARIABLE(Enabled, bool, false);
CONFIG_VARIABLE(Speed, float, 300.0f);
CONFIG_VARIABLE(VerticalSpeed, float, 200.0f);
CONFIG_VARIABLE(Acceleration, float, 0.1f);
CONFIG_VARIABLE(ShowDirectionIndicator, bool, true);
}
