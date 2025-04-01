<template>
  <div style="padding: 10px 0;">
    <div style="display: flex;">
      <img :src="groupDetail?.groupAvatarSrc" alt="组织头像" width="60px" height="60px" style="border: 10px solid rgb(220, 240, 255, 0.5);border-radius: 5%;">
      <div>
        <h1 style="margin: 10px;">{{ groupDetail.name }}</h1>
        <el-tag v-for="tag in groupDetail.tagList" :key="tag.id" size="small" style="margin: 0 8px;">{{ tag.tagName }}</el-tag>
      </div>
    </div>
    <el-descriptions style="padding-top: 10px;">
      <el-descriptions-item label="组织描述" :span="3">{{ groupDetail.description }}</el-descriptions-item>
    </el-descriptions>
    <div class="block">
      <el-carousel height="150px">
        <el-carousel-item v-for="item in 3" :key="item">
          <img :src="groupDetail.galleryImages" alt="组织海报图" style="width: 100%;height: 150px; object-fit: cover;">
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-descriptions style="padding: 10px;">
      <el-descriptions-item label="创建人" :span="2">{{ groupDetail.adminName }}</el-descriptions-item>
      <el-descriptions-item label="成员数" :span="1">{{ groupDetail.memberNum }}</el-descriptions-item>
      <el-descriptions-item label="手机号" :span="3">{{ groupDetail.phone }}</el-descriptions-item> 
      <el-descriptions-item label="联系地址" :span="3">{{ groupDetail.address }}</el-descriptions-item>
      <el-descriptions-item label="组织详情" :span="3">{{ groupDetail.detail }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "GroupDetail",

  props: {
    groupDetail: { type: Object }
  }
}
</script>