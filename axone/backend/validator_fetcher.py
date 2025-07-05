import requests

def get_validator_status():
    rpc_url = {
        "symphony": "https://rpc-symphonyd.onenov.xyz/status",
        "lumera": "https://rpc-lumera.onenov.xyz/status",
        "empeirias": "http://empe-rpc.onenov.xyz/status",
        "warden": "https://warden-testnet-rpc.itrocket.net/status",
        "0g-labs": "https://rpc-0gchaind.onenov.xyz/status",
        "kiichain": "https://rpc-kiichain.winnode.xyz/status",
        "axone": "https://rpc-axone.winsnip.xyz/status"
    }.get("axone")

    try:
        response = requests.get(rpc_url)
        data = response.json()["result"]
        return {
            "moniker": data["node_info"]["moniker"],
            "block_height": data["sync_info"]["latest_block_height"],
            "block_time": data["sync_info"]["latest_block_time"],
            "catching_up": data["sync_info"]["catching_up"],
            "voting_power": data["validator_info"]["voting_power"]
        }
    except Exception as e:
        return {"error": str(e)}
