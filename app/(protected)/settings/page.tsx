import actions from "@/actions";
import { auth } from "@/auth";
import { Button } from "@nextui-org/react";
import React from "react";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      <div>SettingsPage</div>
      <div>{JSON.stringify(session, null, 2)}</div>
      <form className="my-4" action={actions.logout}>
        <Button type="submit" color="danger" variant="flat">
          Sign Out
        </Button>
      </form>
    </div>
  );
}
