#pragma once

#include <Config/ConfigVariable.h>
#include <Config/ConfigVariableTypes.h>
#include <HookContext/HookContextMacros.h>

namespace fly_vars {
    using Enabled = config::BooleanConfigVariable<"FlyEnabled">;
    using SpeedMultiplier = config::FloatConfigVariable<"FlySpeedMultiplier">;
    using FlyKey = config::EnumConfigVariable<"FlyKey">;
}