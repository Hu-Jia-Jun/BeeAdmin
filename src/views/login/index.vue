<script setup lang="ts">
import LoginLeft from "./components/LoginLeft.vue";
import LoginByAccount from "./components/LoginByAccount.vue";
</script>

<template>
	<div class="w-screen h-screen flex">
		<login-left></login-left>
		<div class="flex-c w-full h-full">
			<div class="w-[364px]">
				<span class="inline-block w-1/2 text-[26px] cursor-pointer">账号登录</span>
				<login-by-account></login-by-account>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import "./login.scss";
</style>
