export const chargerStatuses = [
    {
        code: 'waiting',
        label: 'mywb.charger.status.waiting',
        description: 'mywb.charger.status.waiting.description',
        ids: [164, 180, 181, 183, 184, 185, 186, 187, 188, 189],
        remote: false,
        filter: true,
        dataTestId: 'waitingFilterTag',
    },
    {
        code: 'charging',
        label: 'mywb.charger.status.charging',
        description: 'mywb.charger.status.charging.description',
        ids: [193, 194, 195],
        remote: true,
        filter: true,
        dataTestId: 'chargingFilterTag',
    },
    {
        code: 'ready',
        label: 'mywb.charger.status.ready',
        description: 'mywb.charger.status.ready.description',
        ids: [161, 162],
        remote: false,
        filter: true,
        dataTestId: 'readyFilterTag',
    },
    {
        code: 'paused',
        label: 'mywb.charger.status.paused',
        description: 'mywb.charger.status.paused.description',
        ids: [178, 182],
        remote: true,
        filter: true,
        dataTestId: 'pausedFilterTag',
    },
    {
        code: 'scheduled',
        label: 'mywb.charger.status.scheduled',
        description: 'mywb.charger.status.scheduled.description',
        ids: [177, 179],
        remote: true,
        filter: true,
        dataTestId: 'scheduledFilterTag',
    },
    {
        code: 'discharging',
        label: 'mywb.charger.status.discharging',
        description: 'mywb.charger.status.discharging.description',
        ids: [196],
        remote: true,
        filter: true,
        dataTestId: 'dischargingFilterTag',
    },
    {
        code: 'error',
        label: 'mywb.charger.status.error',
        description: 'mywb.charger.status.error.description',
        ids: [14, 15],
        remote: false,
        filter: true,
        dataTestId: 'errorFilterTag',
    },
    {
        code: 'disconnected',
        label: 'mywb.charger.status.disconnected',
        description: 'mywb.charger.status.disconnected.description',
        ids: [0, 163, null],
        remote: false,
        filter: true,
        dataTestId: 'disconnectedFilterTag',
    },
    {
        code: 'locked',
        label: 'mywb.charger.status.locked',
        description: 'mywb.charger.status.locked.description',
        ids: [209, 210, 165],
        remote: true,
        filter: true,
        dataTestId: 'lockedFilterTag',
    },
    {
        code: 'updating',
        label: 'mywb.charger.status.updating',
        description: 'mywb.charger.status.updating.description',
        ids: [166],
        remote: false,
        filter: false,
        dataTestId: 'updatingFilterTag',
    },
];

export const waitingStatuses = [
    {
        ids: [180, 181],
        description: 'mywb.charger.status.waiting.waiting-for-car-demand',
    },
    {
        ids: [183, 184],
        description: 'mywb.charger.status.waiting.in-queue-by-power-sharing',
    },
    {
        ids: [185, 186],
        description: 'mywb.charger.status.waiting.in-queue-by-power-boost',
    },
    {
        ids: [187],
        description: 'mywb.charger.status.waiting.mid-failed',
    },
    {
        ids: [188],
        description: 'mywb.charger.status.waiting.mid-safety-margin-exceeded',
    },
    {
        ids: [189],
        description: 'mywb.charger.status.waiting.in-queue-by-eco-smart',
    },
    {
        ids: [164],
        description: 'mywb.charger.status.waiting.ocpp-charge-finish',
    },
];

export const chargerStatusByCode = (code, key) => {
    const chargerStatus = chargerStatuses.find((status) => status.code === code);
    if (!chargerStatus) return null;
    return chargerStatus[key] || null;
};

export const statusWaitingById = (id) => waitingStatuses.find((status) => status.ids.includes(id))?.description || '';

export const statusById = chargerStatuses
    .reduce((statusIdsMap, status) => ({
        ...statusIdsMap,
        ...status.ids.reduce((idsMap, id) => ({ ...idsMap, [id]: status.code }), {}),
    }), {});

export const idsByStatus = (() => {
    let ids = [];
    chargerStatuses.forEach((status) => {
        if (status.remote) ids = [...ids, ...status.ids];
    });
    return ids;
})();

export const codeByStatus = (charger) => {
    const code = statusById[charger?.status || null];
    const chargerStatus = chargerStatuses.find((status) => status.ids.includes(code));
    return chargerStatus ? chargerStatus.code : code;
};
