const tele = window.Telegram.WebApp

export function useTelegram() {
    const onClose = () => {
        tele.close()
    }

    const onToggleButton = () => {
        if (tele.MainButton.isVisible) {
            tele.MainButton.hide()
        } else {
            tele.MainButton.show()
        }
    }

    return {
        onClose,
        onToggleButton,
        tele,
        user: tele.initDataUnsafe?.user,
        queryId: tele.initDataUnsafe?.query_id,
    }
}
