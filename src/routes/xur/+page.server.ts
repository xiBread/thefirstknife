import { http } from "$lib/server";
import { redirect } from "@sveltejs/kit";
import { DestinyComponentType, getPublicVendors } from "bungie-api-ts/destiny2";

export async function load({ locals }) {
	const token = locals.tokens?.accessToken;
	if (!token || !locals.membership) redirect(302, "/auth");

	const { Response: vendors } = await getPublicVendors(http(token), {
		components: [DestinyComponentType.VendorSales, DestinyComponentType.Vendors],
	});

	const { nextRefreshDate, enabled } = vendors.vendors.data![2190858386];

	return {
		sales: vendors.sales.data![2190858386].saleItems,
		nextRefresh: nextRefreshDate,
		active: enabled,
	};
}
