import { fr } from "@formkit/i18n";
import { defaultConfig } from "@formkit/vue";
import { genesisIcons } from '@formkit/icons'
import { rootClasses } from "./formkit.theme";

export default defaultConfig({
    locales: { fr },
    locale: "fr",
    config: {
        rootClasses,
        genesisIcons
    },
});
