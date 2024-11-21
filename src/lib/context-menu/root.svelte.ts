export function createRootState(initial: {
    isMobile: boolean,
    isActive: boolean,
    alignment: 'left' | 'right',
    x: number,
    y: number
}) {
    let isMobile = $state(initial.isMobile);
    let isActive = $state(initial.isActive);
    let x = $state(initial.x);
    let y = $state(initial.y);

    function getIsMobile() {
        return isMobile;
    }
    function setIsMobile(value: boolean) {
        isMobile = value;
    }

    function getIsActive() {
        return isActive;
    }
    function setIsActive(value: boolean) {
        isActive = value;
    }

    function setContentPosition(newX: number, newY: number) {
        x = newX;
        y = newY;
    }
    function getContentPosition() {
        return { x, y };
    }

    return {
        alignment: initial.alignment,
        getIsMobile,
        setIsMobile,
        getIsActive,
        setIsActive,
        getContentPosition,
        setContentPosition,
    };
}

