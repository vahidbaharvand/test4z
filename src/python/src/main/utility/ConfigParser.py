# Parser for the config file

import configparser
config = configparser.ConfigParser()
config.read('../../../config.cfg')

# Returns the ZOSMF connection information as a dictionary
def get_zosmf_connection():
    return {
        "host_url": config.get('ZOSMF','host_url'),
        "user": config.get('ZOSMF','user'),
        "password": config.get('ZOSMF','password'),
        "ssl_verification": config.getboolean('ZOSMF','ssl_verification')
    }

# Returns the TimOut value as integer for the polling
def get_polling_timeout():
    return config.getint('POLLING','timeout')

# Returns the Interval value as integer for the polling
def get_polling_interval():
    return config.getint('POLLING','interval')

# Returns the Test4z service connection information as a dictionary
def get_test4z_connection():
    return {
        "url": config.get('TEST4Z','host_url') + ":" + config.get('TEST4Z','port') + config.get('TEST4Z','base_path'),
        "user": config.get('TEST4Z','user'),
        "password": config.get('TEST4Z','password'),
        "ssl_verification": config.getboolean('TEST4Z','ssl_verification'),
        "timeout": config.getint('TEST4Z','timeout')
    }
