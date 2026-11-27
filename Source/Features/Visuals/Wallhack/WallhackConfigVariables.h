#pragma once

#include <Config/ConfigVariable.h>
#include <Config/ConfigVariableTypes.h>
#include <HookContext/HookContextMacros.h>

namespace wallhack_vars {
    using Enabled = config::BooleanConfigVariable<"WallhackEnabled">;
}