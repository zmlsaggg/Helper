#pragma once

#include <Features/Common/InWorldPanels.h>
#include <Features/Common/RenderingHookEntityLoop.h>
#include <GameClient/Entities/BaseEntity.h>
#include <GameClient/Entities/BaseModelEntity.h>
#include <GameClient/Entities/PlayerPawn.h>
#include <GameClient/LocalPlayer/LocalPlayer.h>
#include <GameClient/WorldToScreen/WorldToClipSpaceConverter.h>
#include <GameClient/Panorama/PanoramaUiPanel.h>
#include <Utils/ConfigVariable.h>

#include "WallhackConfigVariables.h"

template <typename HookContext>
class Wallhack {
public:
    explicit Wallhack(HookContext& hookContext) noexcept
        : hookContext{hookContext}
    {
    }

    void run() const noexcept
    {
        if (!enabled())
            return;

        // Draw ESP for all players
        hookContext.template make<EntitySystem>().forEachNetworkableEntityIdentity([this](const auto& entityIdentity) {
            const auto entityTypeInfo = hookContext.entityClassifier().classifyEntity(entityIdentity.entityClass);
            if (!entityTypeInfo.template is<cs2::C_CSPlayerPawn>())
                return;

            auto&& baseEntity = hookContext.template make<BaseEntity>(static_cast<cs2::C_BaseEntity*>(entityIdentity.entity));
            auto&& playerPawn = baseEntity.template as<PlayerPawn>();

            if (!shouldDrawESP(playerPawn))
                return;

            drawPlayerESP(playerPawn);
        });
    }

    void onUnload() const noexcept
    {
        // Reset r_drawtransparent if we changed it
    }

private:
    [[nodiscard]] bool enabled() const noexcept
    {
        return GET_CONFIG_VAR(wallhack_vars::Enabled);
    }

    [[nodiscard]] bool showEnemies() const noexcept
    {
        return GET_CONFIG_VAR(wallhack_vars::ShowEnemies);
    }

    [[nodiscard]] bool showTeammates() const noexcept
    {
        return GET_CONFIG_VAR(wallhack_vars::ShowTeammates);
    }

    [[nodiscard]] bool showBoxes() const noexcept
    {
        return GET_CONFIG_VAR(wallhack_vars::ShowBoxes);
    }

    [[nodiscard]] bool showSkeleton() const noexcept
    {
        return GET_CONFIG_VAR(wallhack_vars::ShowSkeleton);
    }

    [[nodiscard]] bool showInfo() const noexcept
    {
        return GET_CONFIG_VAR(wallhack_vars::ShowInfo);
    }

    [[nodiscard]] bool showDistance() const noexcept
    {
        return GET_CONFIG_VAR(wallhack_vars::ShowDistance);
    }

    [[nodiscard]] bool showHealth() const noexcept
    {
        return GET_CONFIG_VAR(wallhack_vars::ShowHealth);
    }

    [[nodiscard]] bool shouldDrawESP(auto&& playerPawn) const noexcept
    {
        if (!playerPawn.isAlive().valueOr(true))
            return false;

        const auto isEnemy = playerPawn.isEnemy().valueOr(true);
        const auto isTeammate = !isEnemy && !playerPawn.isControlledByLocalPlayer();

        if (isEnemy && !showEnemies())
            return false;
        if (isTeammate && !showTeammates())
            return false;
        if (playerPawn.isControlledByLocalPlayer())
            return false;

        return true;
    }

    void drawPlayerESP(auto&& playerPawn) const noexcept
    {
        const auto absOrigin = playerPawn.absOrigin();
        if (!absOrigin.hasValue())
            return;

        const auto position = absOrigin.value();

        // Draw box
        if (showBoxes())
            drawBox(playerPawn, position);

        // Draw skeleton
        if (showSkeleton())
            drawSkeleton(playerPawn, position);

        // Draw info
        if (showInfo())
            drawInfo(playerPawn, position);
    }

    void drawBox(auto&& playerPawn, const cs2::Vector& position) const noexcept
    {
        // Create box panel using PlayerInfoPanel
        auto&& panel = hookContext.template make<InWorldPanels>().getNextPlayerInfoPanel();
        panel.drawPlayerInfo(playerPawn);
        panel.updatePosition(position);
    }

    void drawSkeleton(auto&& playerPawn, const cs2::Vector& position) const noexcept
    {
        // Draw skeleton using bone positions
        // (simplified skeleton - head, torso, limbs)
        const auto headPos = position + cs2::Vector{0.0f, 0.0f, 60.0f};
        const auto chestPos = position + cs2::Vector{0.0f, 0.0f, 40.0f};
        const auto pelvisPos = position + cs2::Vector{0.0f, 0.0f, 20.0f};

        // Draw skeleton lines
        drawLine(headPos, chestPos);
        drawLine(chestPos, pelvisPos);
    }

    void drawInfo(auto&& playerPawn, const cs2::Vector& position) const noexcept
    {
        // Draw info panel with health and distance
        auto&& panel = hookContext.template make<InWorldPanels>().getNextPlayerInfoPanel();
        panel.drawPlayerInfo(playerPawn);
        panel.updatePosition(position);
    }

    void drawLine(const cs2::Vector& from, const cs2::Vector& to) const noexcept
    {
        // Draw line between two points in clip space
        // (implementation depends on rendering backend)
    }

    HookContext& hookContext;
};