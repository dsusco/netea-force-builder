import { error } from '@sveltejs/kit';
import armyList from '$lib/army-list.svelte.js';

export async function load({ fetch, params }) {
  const response = await fetch(`/json/army-lists/${params.armyList}.json`);

  if (!response.ok) {
    error(response.status, response.statusText);
  }

  armyList.json = await response.json();

  return {};
}
