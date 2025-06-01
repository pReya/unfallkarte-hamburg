export const prerender = false;

import type { APIRoute } from "astro";
import { accidents, db, eq } from "astro:db";

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;

  if (id) {
    const accident = await db
      .select({
        Datum: accidents.Datum,
        Zeit: accidents.Zeit,
        "Koord.x": accidents["Koord.x"],
        "Koord.y": accidents["Koord.y"],
        Kl: accidents.Kl,
        NrBu: accidents.NrBu,
        Zif: accidents.Zif,
        OL: accidents.OL,
        Gt: accidents.Gt,
        Sv: accidents.Sv,
        Lv: accidents.Lv,
        Bet: accidents.Bet,
        Art: accidents.Art,
        Char1: accidents.Char1,
        Char2: accidents.Char2,
        Char3: accidents.Char3,
        Beso1: accidents.Beso1,
        Beso2: accidents.Beso2,
        Beso3: accidents.Beso3,
        LZ: accidents.LZ,
        L: accidents.L,
        SZ: accidents.SZ,
        AH: accidents.AH,
        Kat: accidents.Kat,
        Typ: accidents.Typ,
        Urs01: accidents.Urs01,
        Urs02: accidents.Urs02,
        Urs03: accidents.Urs03,
        AV1: accidents.AV1,
        AV2: accidents.AV2,
        Licht: accidents.Licht,
        Str_Zus: accidents.Str_Zus,
        Bet_01: accidents.Bet_01,
        Bet_02: accidents.Bet_02,
        Geschl_01: accidents.Geschl_01,
        Geschl_02: accidents.Geschl_02,
        Alter_01: accidents.Alter_01,
        Alter_02: accidents.Alter_02,
        Unf_Typ: accidents.Unf_Typ,
        Kz_Bet1: accidents.Kz_Bet1,
        Kz_Bet2: accidents.Kz_Bet2,
        BAB_Km: accidents.BAB_Km,
        M: accidents.M,
        OrdNr: accidents.OrdNr,
        Fahrtrichtung: accidents.Fahrtrichtung,
        GlobalId: accidents.GlobalId,
      })
      .from(accidents)
      .where(eq(accidents.GlobalId, id));

    if (!accident?.length) {
      return new Response(null, {
        status: 404,
        statusText: "Not found",
      });
    }

    return new Response(JSON.stringify(accident[0]), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response(null, {
    status: 404,
    statusText: "Not found",
  });
};
