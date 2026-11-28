#include "Utils/ManuallyDestructible.h"
#include "Platform/Macros/IsPlatform.h"

#include "GlobalContext/GlobalContext.h"
#include "MemoryAllocation/MemoryAllocatorBaseImpl.h"

constinit ManuallyDestructible<GlobalContext> GlobalContext::globalContext;

#include "EntryPoints/EntryPoints.h"

#if IS_WIN64()
#include "BuildConfig.h"
#include "MemoryPatterns/Windows/WindowsPatterns.h"
#include "Platform/Windows/WindowsPlatformApiImpl.h"

#include <Windows.h>

void operator delete(void*, std::size_t) noexcept
{
    // for 'placement new' to work
}

namespace
{
    [[nodiscard]] bool areRequiredGameModulesLoaded() noexcept
    {
        return GetModuleHandleA(cs2::CLIENT_DLL)
            && GetModuleHandleA(cs2::PANORAMA_DLL)
            && GetModuleHandleA(cs2::SDL_DLL)
            && GetModuleHandleA(cs2::TIER0_DLL)
            && GetModuleHandleA(cs2::SOUNDSYSTEM_DLL)
            && GetModuleHandleA(cs2::FILESYSTEM_DLL)
            && GetModuleHandleA(cs2::SCENESYSTEM_DLL);
    }

    DWORD WINAPI initializeGlobalContextThread(LPVOID) noexcept
    {
        // ExLoader can inject while CS2 is still starting. Do not construct
        // GlobalContext until every module used by PartialGlobalContext exists.
        constexpr DWORD pollIntervalMs = 100;
        constexpr DWORD maxWaitMs = 120000;

        for (DWORD waitedMs = 0; waitedMs < maxWaitMs; waitedMs += pollIntervalMs) {
            if (areRequiredGameModulesLoaded()) {
                GlobalContext::initializeInstance();
                return 0;
            }
            Sleep(pollIntervalMs);
        }

        return 0;
    }
}

extern "C" std::size_t DllMain(HMODULE module, DWORD reason, LPVOID) noexcept
{
    if (reason == DLL_PROCESS_ATTACH) {
        DisableThreadLibraryCalls(module);

        // Heavy initialization must not run under the Windows loader lock.
        const auto initThread = CreateThread(nullptr, 0, initializeGlobalContextThread, nullptr, 0, nullptr);
        if (initThread)
            CloseHandle(initThread);
    }
    return TRUE;
}

#elif IS_LINUX()

#include "MemoryPatterns/Linux/LinuxPatterns.h"
#include "Platform/Linux/LinuxPlatformApiImpl.h"

void __attribute__((constructor)) DllEntryPoint()
{
    GlobalContext::initializeInstance();
}

#endif
