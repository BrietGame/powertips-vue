<template>
  <div class="container">
    <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Espace modérateur</h1>

    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="users-tab" data-tabs-target="#users" type="button" role="tab" aria-controls="users" aria-selected="false">Utilisateurs</button>
        </li>
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="guides-tab" data-tabs-target="#guides" type="button" role="tab" aria-controls="guides" aria-selected="false">Guides</button>
        </li>
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="categories-tab" data-tabs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="false">Catégories</button>
        </li>
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="comments-tab" data-tabs-target="#comments" type="button" role="tab" aria-controls="comments" aria-selected="false">Commentaires</button>
        </li>
        <li class="mr-2" role="presentation">
          <button class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="notes-tab" data-tabs-target="#notes" type="button" role="tab" aria-controls="notes" aria-selected="false">Notes</button>
        </li>
      </ul>
    </div>
    <div id="myTabContent">
      <div class="hidden" id="users" role="tabpanel" aria-labelledby="users-tab">
        <Users />
      </div>
      <div class="hidden" id="guides" role="tabpanel" aria-labelledby="guides-tab">
        <Guides />
      </div>
      <div class="hidden" id="categories" role="tabpanel" aria-labelledby="categories-tab">
        <Categories />
      </div>
      <div class="hidden" id="comments" role="tabpanel" aria-labelledby="comments-tab">
        <Comments />
      </div>
      <div class="hidden" id="notes" role="tabpanel" aria-labelledby="notes-tab">
        <Notes />
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import Users from "@/views/admin/users/Users.vue";
import Guides from "@/views/admin/guides/Guides.vue";
import Categories from "@/views/admin/categories/Categories.vue";
import Comments from "@/views/admin/comments/Comments.vue";
import Notes from "@/views/admin/notes/Notes.vue";

export default {
  name: 'Admin',
  components: {Notes, Comments, Categories, Guides, Users, Table}
}
</script>