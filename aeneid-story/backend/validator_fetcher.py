import requests

def get_validator_status():
    rpc_url = "https://story-testnet-rpc.itrocket.net/status"
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
