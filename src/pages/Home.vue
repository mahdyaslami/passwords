<template>
  <div class="max-w-xl mx-auto pt-20">
    <div>
      <button
        class="float-right w-6 h-6 ml-4"
        @click="database.export()"
      >
        <icon-export />
      </button>

      <router-link
        to="/pairs/create"
        class="text-blue-500 underline float-right ml-2"
      >
        Create Pair
      </router-link>

      <router-link
        to="/identities/create"
        class="text-blue-500 underline float-right ml-2"
      >
        Create Identity
      </router-link>

      <router-link
        to="/hosts/create"
        class="text-blue-500 underline float-right ml-2"
      >
        Create Host
      </router-link>

      <h1 class="text-3xl mb-8">
        Search
      </h1>
    </div>

    <div class="mb-4">
      <base-label
        for="search"
      >
        Search
      </base-label>
      <div class="mt-1">
        <base-input
          id="search"
          v-model="state.predicate"
          type="text"
          placeholder="blograph.ir valasr"
        />
      </div>
    </div>

    <div
      v-for="row in database.search(state.predicate)"
      :key="row.id"
    >
      <template v-if="(row._type === 'PAIR')">
        <pair-card
          :item="row"
          class="mb-2"
        />
      </template>
      <template v-else-if="(row._type === 'IDENTITY')">
        <identity-card
          class="mb-2"
          :item="row"
        />
      </template>
      <template v-else-if="(row._type === 'HOST')">
        <host-card
          class="mb-2"
          :item="row"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { useDatabaseStore } from '@/stores/database'
import BaseInput from '@/components/Input'
import BaseLabel from '@/components/Label'
import PairCard from '@/components/PairCard'
import IdentityCard from '@/components/IdentityCard'
import HostCard from '@/components/HostCard'
import { reactive } from 'vue'
import IconExport from '@/components/IconExport'

const database = useDatabaseStore()

const state = reactive({
  predicate: '',
})

</script>
