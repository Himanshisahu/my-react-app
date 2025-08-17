export const savePosition = (id, pos) => {
    console.log('================== save ', id, pos)
    localStorage.setItem(`todo-pos-${id}`, JSON.stringify(pos));
};

export const getPosition = (id) => {
    console.log("======getPositiongetPosition=======")
    const pos = localStorage.getItem(`todo-pos-${id}`);
    if (!pos) return { x: 0, y: 0 };
    try {
        const parsed = JSON.parse(pos);
        return {
            x: typeof parsed.x === "number" ? parsed.x : 0,
            y: typeof parsed.y === "number" ? parsed.y : 0,
        };
    } catch (e) {
        return { x: 0, y: 0 };
    }
};
