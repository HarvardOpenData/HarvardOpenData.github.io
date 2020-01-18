import os
from functools import reduce, partial
from collections import namedtuple

import asana

SECRET = os.environ['ASANA_SECRET']
PROJECT_ID = '1140949342574617'

Task = namedtuple('Task', ['gid', 'name', 'assignee', 'notes', 'section', 'completed',
                           'category', 'difficulty', 'due', 'tags', 'url'])


def create_task(record) -> Task:
    """Parses an Asana task record as received from the API endpoint."""
    def parse_resource(resource, record):
        # Skip empty records or irrelevant custom fields
        if resource['type'] != 'enum':
            return record

        enum = resource
        name = enum['name'].lower().strip()
        value_option = enum['enum_value']
        value = '' if not value_option else value_option.get('name')

        record[name] = value
        return record

    def flatten_resources(resource_list, initial):
        if resource_list is None:
            return initial
        return reduce(lambda record, field: parse_resource(field, record), resource_list, initial)

    gid = record['gid']

    assignee_option = record['assignee']
    assignee = '' if not assignee_option else assignee_option['name']

    section = record['memberships'][0]['section']['name']

    custom_fields = flatten_resources(record['custom_fields'], {})
    difficulty = custom_fields['difficulty']
    category = custom_fields['category']

    tags = [field['name'] for field in record['tags']]

    url = 'https://app.asana.com/0/{project_id}/{task_id}'.format(
        project_id=PROJECT_ID, task_id=gid)

    return Task(gid=gid,
                name=record['name'],
                assignee=assignee,
                notes=record['notes'],
                completed=record['completed'],
                category=category,
                difficulty=difficulty,
                section=section,
                url=url,
                due=record['due_on'],
                tags=tags)


client = asana.Client.access_token(SECRET)


def get_tasks():
    tasks = list(client.tasks.find_by_project(PROJECT_ID))
    tasks = [client.tasks.find_by_id(task['gid']) for task in tasks]
    tasks = [create_task(client.tasks.find_by_id(task['gid']))
             for task in tasks]
    return tasks
