#pragma once

#include <array>
#include <bit>
#include <cstddef>
#include <cstring>
#include <type_traits>

#include "ConfigVariable.h"
#include "ConfigVariableTypes.h"
#include <Utils/Meta.h>

class ConfigVariables {
public:
    ConfigVariables() noexcept
    {
        ConfigVariableTypes::forEach([this] <typename ConfigVariable> (std::type_identity<ConfigVariable>) {
            this->storeVariableValue<ConfigVariable>(ConfigVariable::kDefaultValue);
        });
    }

    template <typename ConfigVariable>
    [[nodiscard]] auto getVariableValue() noexcept
    {
        return std::bit_cast<typename ConfigVariable::ValueType>(variableStorage<ConfigVariable>());
    }

    template <typename ConfigVariable>
    void storeVariableValue(ConfigVariable::ValueType value) noexcept
    {
        std::memcpy(&variableStorage<ConfigVariable>(), &value, sizeof(value));
    }

private:
    template <typename ConfigVariable>
    [[nodiscard]] auto& variableStorage() noexcept
    {
        if constexpr (OneByteConfigVariables::template contains<ConfigVariable>())
            return oneByteConfigVariables[OneByteConfigVariables::template indexOf<ConfigVariable>()];
        else if constexpr (TwoByteConfigVariables::template contains<ConfigVariable>())
            return twoByteConfigVariables[TwoByteConfigVariables::template indexOf<ConfigVariable>()];
        else if constexpr (FourByteConfigVariables::template contains<ConfigVariable>())
            return fourByteConfigVariables[FourByteConfigVariables::template indexOf<ConfigVariable>()];
        else
            static_assert(!std::is_same_v<ConfigVariable, ConfigVariable>, "Unsupported config variable size");
    }

    using OneByteConfigVariables = ConfigVariableTypes::filter<Projected<UnpackConfigVariable, WithSizeOf<1>::Equal>::Value>;
    using TwoByteConfigVariables = ConfigVariableTypes::filter<Projected<UnpackConfigVariable, WithSizeOf<2>::Equal>::Value>;
    using FourByteConfigVariables = ConfigVariableTypes::filter<Projected<UnpackConfigVariable, WithSizeOf<4>::Equal>::Value>;

    std::array<std::array<std::byte, 1>, OneByteConfigVariables::size()> oneByteConfigVariables{};
    std::array<std::array<std::byte, 2>, TwoByteConfigVariables::size()> twoByteConfigVariables{};
    std::array<std::array<std::byte, 4>, FourByteConfigVariables::size()> fourByteConfigVariables{};
};
