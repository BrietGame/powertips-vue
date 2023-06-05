<template>
  <div class="container">
    <h1>Admin</h1>

    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="dashboard-tab" data-tabs-target="#users" type="button" role="tab" aria-controls="dashboard" aria-selected="false">Utilisateurs</button>
        </li>
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#guides" type="button" role="tab" aria-controls="settings" aria-selected="false">Guides</button>
        </li>
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#categories" type="button" role="tab" aria-controls="settings" aria-selected="false">Catégories</button>
        </li>
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#comments" type="button" role="tab" aria-controls="settings" aria-selected="false">Commentaires</button>
        </li>
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#notes" type="button" role="tab" aria-controls="settings" aria-selected="false">Notes</button>
        </li>
      </ul>
    </div>
    <div id="myTabContent">
      <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="users" role="tabpanel" aria-labelledby="profile-tab">
        <Users />
      </div>
      <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="guides" role="tabpanel" aria-labelledby="dashboard-tab">
        <Guides />
      </div>
      <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="categories" role="tabpanel" aria-labelledby="settings-tab">
        <Categories />
      </div>
      <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="comments" role="tabpanel" aria-labelledby="contacts-tab">
        <Comments />
      </div>
      <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="notes" role="tabpanel" aria-labelledby="contacts-tab">
        <Notes />
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import Users from "@/views/admin/categories/Categories.vue";
import Guides from "@/views/admin/guides/Guides.vue";
import Categories from "@/views/admin/categories/Categories.vue";
import Comments from "@/views/admin/comments/Comments.vue";
import Notes from "@/views/admin/notes/Notes.vue";

export default {
  name: 'Admin',
  components: {Notes, Comments, Categories, Guides, Users, Table}
}
</script>