import { defineComponent, PropType } from "vue";
import "uno.css";

export type IColor = "blue" | "green" | "gray" | "yellow" | "red";
export const props = {
	color: {
		type: String as PropType<IColor>,
		default: "blue",
	},
	icon: {
		type: String,
		default: "",
	},
};
export default defineComponent({
	name: "SButton",
	props,
	setup(props, { slots }) {
		return () => (
			<button
				class={`
                    py-2
                    px-4
                    font-semibold
                    rounded-lg
                    shadow-md
                    text-white
                    border-none
                    cursor-pointer
                    m-1
                    bg-${props.color}-500
                    hover:bg-${props.color}-700
                `}
			>
				{/* jsx 版 v-if */}
				{props.icon !== "" ? <i class={`i-ic-baseline-${props.icon} p-3`}></i> : ""}
				{slots.default ? slots.default() : ""}
			</button>
		);
	},
});
