export default function _log(message, preview, payload) {
    if (__DEV__ && console.tron) {
        if (preview) {
            console.tron.display({
                name: message,
                preview: preview,
                value: {
                    payload: payload || {}
                }
            });
        } else {
            console.tron.log(message);
        }
    }
}