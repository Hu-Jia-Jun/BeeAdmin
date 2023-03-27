<script setup lang="ts">
import LogoIcon from "@/assets/svg/logo.svg?component";
import { VITE_GLOB_APP_APP_DESCRIPTION } from "@/config/config";
</script>

<template>
	<div class="login-left flex-sc !w-[680px] h-full text-[#fff] font-bold">
		<section class="ml-[70px]">
			<LogoIcon />
			<ul class="mt-[59px]">
				<li v-for="item in VITE_GLOB_APP_APP_DESCRIPTION" :key="item" class="text-[#fafbfc] font-light mt-4">{{ item }}</li>
			</ul>
		</section>
	</div>
</template>

<style scoped lang="scss">
.login-left {
	background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);
	background-blend-mode: multiply, multiply;
	transition: margin-left 1.5s ease;
	li::before {
		display: inline-block;
		width: 6px;
		height: 6px;
		margin-right: 12px;
		content: "";
		background-color: transparent;
		border: 4px solid hsl(0deg 0% 100% / 30%);
		border-radius: 50%;
		border-radius: 50%;
	}
}
@media screen and (max-width: 998px) {
	.login-left {
		margin-left: -680px;
	}
}
</style>
