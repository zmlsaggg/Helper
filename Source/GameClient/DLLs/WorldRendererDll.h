#pragma once

#include <CS2/Constants/DllNames.h>
#include <Platform/DynamicLibrary.h>
#include <Utils/GenericPointer.h>

namespace cs2
{
    struct IWorldRendererMgr;
}

struct WorldRendererDll : DynamicLibrary {
    using CreateInterfaceFn = void* (*)(const char* interfaceName, int* returnCode);

    WorldRendererDll() noexcept
        : DynamicLibrary{cs2::WORLDRENDERER_DLL}
    {
    }

    [[nodiscard]] void* worldRendererManager() const noexcept
    {
        const auto createInterface = getFunctionAddress("CreateInterface").as<CreateInterfaceFn>();
        if (!createInterface)
            return nullptr;

        return createInterface("WorldRendererMgr001", nullptr);
    }
};
