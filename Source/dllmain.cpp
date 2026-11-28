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
#include <cstdio>

void operator delete(void*, std::size_t) noexcept
{
    // for 'placement new' to work
}

namespace
{
    HANDLE runtimeInstanceMutex{nullptr};

    [[nodiscard]] bool acquireRuntimeInstanceGuard() noexcept
    {
        char mutexName[96]{};
        std::snprintf(mutexName, sizeof(mutexName), "Local\\Zenvy.CS2.Runtime.Singleton.%lu",
            static_cast<unsigned long>(GetCurrentProcessId()));

        const auto mutex = CreateMutexA(nullptr, FALSE, mutexName);
        if (!mutex)
            return false;

        if (GetLastError() == ERROR_ALREADY_EXISTS) {
            CloseHandle(mutex);
            return false;
        }

        runtimeInstanceMutex = mutex;
        return true;
    }

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
        // Prevent a second manually mapped copy from installing another set
        // of hooks over the first copy in the same CS2 process.
        if (!acquireRuntimeInstanceGuard())
            return 0;

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

        CloseHandle(runtimeInstanceMutex);
        runtimeInstanceMutex = nullptr;
        return 0;
    }
}

void releaseRuntimeInstanceGuard() noexcept
{
    if (runtimeInstanceMutex) {
        CloseHandle(runtimeInstanceMutex);
        runtimeInstanceMutex = nullptr;
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

void releaseRuntimeInstanceGuard() noexcept
{
}

#include "MemoryPatterns/Linux/LinuxPatterns.h"
#include "Platform/Linux/LinuxPlatformApiImpl.h"

void __attribute__((constructor)) DllEntryPoint()
{
    GlobalContext::initializeInstance();
}

#endif
