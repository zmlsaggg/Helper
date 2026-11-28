#pragma once

#include <Config/RangeConstrainedVariableParams.h>
#include <CS2/Classes/Color.h>
#include <CS2/Constants/ColorConstants.h>
#include <Utils/ColorUtils.h>

namespace model_glow_params
{
    constexpr cs2::Color kFallbackColor{cs2::kColorWhite};

    constexpr HueVariableParams kPlayerBlueHue{.min{color::HueInteger{191}}, .max{color::HueInteger{240}}, .def{color::HueInteger{215}}};
    constexpr HueVariableParams kPlayerGreenHue{.min{color::HueInteger{110}}, .max{color::HueInteger{140}}, .def{color::HueInteger{125}}};
    constexpr HueVariableParams kPlayerYellowHue{.min{color::HueInteger{47}}, .max{color::HueInteger{60}}, .def{color::HueInteger{53}}};
    constexpr HueVariableParams kPlayerOrangeHue{.min{color::HueInteger{11}}, .max{color::HueInteger{20}}, .def{color::HueInteger{15}}};
    constexpr HueVariableParams kPlayerPurpleHue{.min{color::HueInteger{250}}, .max{color::HueInteger{280}}, .def{color::HueInteger{265}}};

    constexpr HueVariableParams kTeamTHue{.min{color::HueInteger{30}}, .max{color::HueInteger{40}}, .def{color::HueInteger{35}}};
    constexpr HueVariableParams kTeamCTHue{.min{color::HueInteger{210}}, .max{color::HueInteger{230}}, .def{color::HueInteger{220}}};

    constexpr HueVariableParams kLowHealthHue{.min{color::HueInteger{0}}, .max{color::HueInteger{359}}, .def{color::HueInteger{0}}};
    constexpr HueVariableParams kHighHealthHue{.min{color::HueInteger{0}}, .max{color::HueInteger{359}}, .def{color::HueInteger{120}}};

    constexpr HueVariableParams kAllyHue{.min{color::HueInteger{0}}, .max{color::HueInteger{359}}, .def{color::HueInteger{120}}};
    constexpr HueVariableParams kEnemyHue{.min{color::HueInteger{0}}, .max{color::HueInteger{359}}, .def{color::HueInteger{0}}};

    constexpr HueVariableParams kMolotovHue{.min{color::HueInteger{20}}, .max{color::HueInteger{60}}, .def{color::HueInteger{40}}};
    constexpr HueVariableParams kFlashbangHue{.min{color::HueInteger{191}}, .max{color::HueInteger{250}}, .def{color::HueInteger{219}}};
    constexpr HueVariableParams kHEGrenadeHue{.min{color::HueInteger{300}}, .max{color::HueInteger{359}}, .def{color::HueInteger{359}}};
    constexpr HueVariableParams kSmokeGrenadeHue{.min{color::HueInteger{110}}, .max{color::HueInteger{140}}, .def{color::HueInteger{120}}};

    constexpr HueVariableParams kDroppedBombHue{.min{color::HueInteger{0}}, .max{color::HueInteger{359}}, .def{color::HueInteger{60}}};
    constexpr HueVariableParams kTickingBombHue{.min{color::HueInteger{0}}, .max{color::HueInteger{359}}, .def{color::HueInteger{0}}};
    constexpr HueVariableParams kDefuseKitHue{.min{color::HueInteger{0}}, .max{color::HueInteger{359}}, .def{color::HueInteger{184}}};

    constexpr color::Saturation kNormalPlayerColorSaturation{1.0f};
    constexpr color::Saturation kImmunePlayerColorSaturation{0.5f};
}
