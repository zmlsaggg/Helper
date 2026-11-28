#pragma once

#include <Config/ConfigVariable.h>

namespace wallhack_vars {
    CONFIG_VARIABLE(Enabled, bool, false);
    CONFIG_VARIABLE(ShowEnemies, bool, true);
    CONFIG_VARIABLE(ShowTeammates, bool, true);
    CONFIG_VARIABLE(ShowBoxes, bool, true);
    CONFIG_VARIABLE(ShowSkeleton, bool, true);
    CONFIG_VARIABLE(ShowInfo, bool, true);
    CONFIG_VARIABLE(ShowDistance, bool, true);
    CONFIG_VARIABLE(ShowHealth, bool, true);
}