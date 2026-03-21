import logging
from datetime import datetime
import os
import json

def setup_logging(log_file):
    """Setup logging to a file."""
    logging.basicConfig(
        filename=log_file,
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )

def get_current_timestamp():
    """Get current timestamp in milliseconds."""
    return int(datetime.now().timestamp() * 1000)

def load_config(config_file):
    """Load configuration from a JSON file."""
    try:
        with open(config_file, 'r') as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        logging.error(f"Failed to parse JSON from {config_file}: {e}")
        return None

def get_env_var(var_name, default=None):
    """Get environment variable or default value."""
    return os.environ.get(var_name, default)