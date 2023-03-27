<script setup lang="ts">
import { ref, reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElForm } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

const accountForm = reactive({
	account: "admin",
	password: "admin123456"
});

// 定义accountFormRef，校验规则
const accountFormRef = ref<FormInstance>();
const loginRules = reactive<FormRules>({
	account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});
const loading = ref(false);

const onLogin = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	loading.value = true;
	await formEl.validate((valid, fields) => {
		if (valid) {
			loading.value = false;
			console.log("submit!");
		} else {
			loading.value = false;
			return fields;
		}
	});
};
</script>

<template>
	<div>
		<el-form ref="accountFormRef" :model="accountForm" :rules="loginRules" size="large" class="w-[364px] mt-6">
			<el-form-item label="">
				<el-input placeholder="请输入用户账号" v-model="accountForm.account" class="h-12">
					<template #prefix>
						<el-icon class="el-input__icon"><user /></el-icon>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item label="">
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
