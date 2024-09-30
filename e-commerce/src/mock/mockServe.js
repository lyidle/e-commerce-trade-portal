import Mock from "mockjs";
// 导入数据
import banner from "@/mock/banner";
import floor from "@/mock/floor";
// mock数据：第一个参数请求地址第二个参数：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner });//模拟首页大的轮播图的数据
Mock.mock("/mock/floor", { code: 200, data: floor });