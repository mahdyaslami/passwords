<template>
  <div class="max-w-xl mx-auto pt-20">
    <div>
      <router-link
        to="/pairs/create"
        class="text-blue-500 underline float-right"
      >
        Create Pair
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
          type="text"
          placeholder="blograph.ir valasr"
        />
      </div>
    </div>

    <div
      v-for="row in database.rows"
      :key="row.id"
    >
      <template v-if="(row instanceof Pair)">
        <pair-card
          :item="row"
          class="mb-2"
        />
      </template>
      <template v-else-if="(row instanceof Identity)">
        <identity-card :item="row" />
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
import { Pair, Identity } from '@/class'

const database = useDatabaseStore()

</script>
