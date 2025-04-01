<template>
  <div style="margin-top: 10px;">
    <div v-for="resource in groupResources" class="resource-item">
      <div style="display: flex;">
        <img :src="resource.adminAvatarSrc" alt="上传者头像" class="user-avatar">
        <div style="padding: 5px; width: 100%;">
          <h2 style="margin: 0px; font-size: 22px;">{{ resource.resourceName }}</h2>
          <div style="display: flex; margin-top: 3px;">
            <p style="margin: 0px; font-size: 14px; width: 40%; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">上传者：{{ resource.adminName }}</p>
            <p style="margin: 0px; font-size: 14px; width: 60%;">资源大小: {{ resource.resourceSize }}MB</p>
          </div>
        </div>
      </div>
      <p class="resource-desc">
        &ensp;&ensp;&ensp;&ensp;资源描述：{{ resource.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupResource',
  props: {
    groupResources: {type: Array}
  }
}
</script>

<style scoped>
.resource-item {
  padding-bottom: 10px; 
  padding-left: 5px;
}
.resource-item:hover {
  background-color: rgb(236, 245, 255);
}
.user-avatar {
  width: 45px;
  height: 45px;
  margin: 5px;
  margin-top: 9px;
}
.resource-desc {
  margin: 0px; 
  padding: 0 5px; 
  font-size: 14px; 
  display: -webkit-box; 
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 2; 
  overflow: hidden;
}
</style>