import { createRouter, createWebHistory } from "vue-router";
import { staticRouter } from "./modules/staticRouter";
export const router = createRouter({
	history: createWebHistory(),
	routes: [...staticRouter]
});
