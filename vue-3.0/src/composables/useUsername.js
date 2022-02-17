import { ref, computed } from 'vue';
export default function useUsername(user) {
  // 独立的computed属性
  const searchQuery = ref('');
  const searchUsername = computed(() => {
    return user.value.username
  })

  return {
    searchQuery,
    searchUsername
  };
}