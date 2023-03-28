<script setup lang="ts">
import { ref, reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElForm } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import type { Login } from "@/api/interface/index";
import md5 from "js-md5";
import { UserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config/config";
import { ElNotification } from "element-plus";
import { loginApi } from "@/api/module/login";
const accountForm = reactive<Login.ReqLoginForm>({
	username: "admin",
	password: "admin123456"
});
const router = useRouter();

// 定义accountFormRef，校验规则
const accountFormRef = ref<FormInstance>();
const loginRules = reactive<FormRules>({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});
const loading = ref(false);
const onLogin = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	loading.value = true;
	await formEl.validate(async valid => {
		if (!valid) return;
		loading.value = true;
		try {
			// 1. 请求登录接口
			const reqForm = { ...accountForm, password: md5(accountForm.password) };
			const { data } = await loginApi(reqForm);
			UserStore().SET_TOKEN(data.accessToken);

			// 3. 设置动态路由（todo)
			// 4. 跳转到首页
			router.push(HOME_URL);
			// 5. 设置欢迎语
			ElNotification({
				title: "您好",
				message: "欢迎登录",
				type: "success",
				duration: 3000
			});
		} catch (error) {
			loading.value = false;
		}
	});
};
</script>

<template>
	<div>
		<el-form ref="accountFormRef" :model="accountForm" :rules="loginRules" size="large" class="w-[364px] mt-6">
			<el-form-item label="" prop="username">
				<el-input placeholder="请输入用户账号" v-model="accountForm.username" class="h-12">
					<template #prefix>
						<el-icon class="el-input__icon"><user /></el-icon>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item label="" prop="password">
				<el-input placeholder="请输入密码" v-model="accountForm.password" show-password class="h-12">
					<template #prefix>
						<el-icon class="el-input__icon"><lock /></el-icon>
					</template>
				</el-input>
			</el-form-item>
		</el-form>
		<el-button
			size="large"
			type="primary"
			class="w-full mt-[2px] !h-12 !text-[16px]"
			:loading="loading"
			@click="onLogin(accountFormRef)"
			>登 录</el-button
		>
	</div>
</template>

<style scoped></style>
