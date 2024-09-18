import { JSX } from "preact";
import { useState } from "preact/hooks";
import { joinCss } from "~utils/css.ts";

interface Properties extends Omit<JSX.HTMLAttributes<HTMLInputElement>, "value"> {
    class?: string;
    label: string;
}

export const Tags = ({
    class: _class,
    defaultValue,
    id,
    label,
    name,
    required,
    ...rest
}: Properties) => {
    const [currentTag, setCurrentTag] = useState(defaultValue || "");
    const [tags, setTags] = useState<string[]>([]);

    function handleInput(event: InputEvent) {
        setCurrentTag((event.target as HTMLInputElement).value);
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            event.preventDefault();

            if (currentTag && !tags.includes(currentTag.toString())) {
                setTags((values) => [...values, currentTag.toString()]);
                setCurrentTag("");
            }
        }
    }

    function removeTag(tag: string) {
        setTags(tags.filter((t) => t !== tag));
    }

    const inputCss = joinCss(
        "block w-full rounded-sm border-0 pt-1 text-gray-900 ring-2 mt-2",
        "ring-yellow-950 placeholder:text-gray-400 focus:ring-2 flex flex-wrap",
        "focus:ring-inset focus:ring-yellow-700 sm:text-sm sm:leading-6",
    );

    return (
        <div class={_class}>
            <label class="text-sm font-semibold leading-6 text-gray-900 flex items-center" for={id || name}>
                {label}
                {!required && <span class="ml-auto text-xs text-gray-400">(optional)</span>}
            </label>

            <div class={inputCss}>
                {tags.map((tag) => (
                    <span class="mb-1 bg-black text-white font-medium ml-1 px-1 rounded flex items-center">
                        <input type="hidden" name={name + "[]"} value={tag} />
                        {tag}
                        <button type="button" class="font-mono ml-1" onClick={() => removeTag(tag)}>x</button>
                    </span>
                ))}

                <input
                    class="py-0 border-0 focus:ring-0 mb-1 bg-gray-100"
                    id={id || name}
                    required={required}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    value={currentTag}
                    {...rest}
                />
            </div>
        </div>
    );
};
