-- Function: Purchase Reward (Transaction)
create or replace function public.purchase_reward(
  p_reward_id uuid
)
returns json
language plpgsql
security definer
as $$
declare
  v_cost int;
  v_balance int;
  v_player_id uuid;
begin
  -- Get current user ID
  v_player_id := auth.uid();
  if v_player_id is null then
    return json_build_object('success', false, 'message', 'Not authenticated');
  end if;

  -- Get reward cost
  select cost into v_cost
  from public.rewards
  where id = p_reward_id;

  if not found then
    return json_build_object('success', false, 'message', 'Item not found');
  end if;

  -- Get player balance
  select gold_balance into v_balance
  from public.profiles
  where id = v_player_id;

  -- Check funds
  if v_balance < v_cost then
    return json_build_object('success', false, 'message', 'Saldo insuficiente');
  end if;

  -- Deduct Gold
  update public.profiles
  set gold_balance = gold_balance - v_cost
  where id = v_player_id;

  -- Add to Inventory
  insert into public.inventory (player_id, reward_id)
  values (v_player_id, p_reward_id);

  return json_build_object('success', true, 'message', 'Compra realizada com sucesso!', 'new_balance', v_balance - v_cost);

exception when others then
  return json_build_object('success', false, 'message', SQLERRM);
end;
$$;
