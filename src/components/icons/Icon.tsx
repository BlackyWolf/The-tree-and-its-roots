import { joinCss } from "~utils/css.ts";

interface Properties {
    class?: string;
    name: string;
}

export const Icon = ({ class: _class, name }: Properties) => {
    const css = joinCss("icon", _class);

    return (
        <img src={`/icons/${name}.svg`} class={css} alt="add" />
    );
};

