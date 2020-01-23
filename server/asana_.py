import os
from itertools import groupby
from functools import reduce, partial
from collections import namedtuple
from threading import Lock
from typing import Dict, List

import asana

SECRET = os.environ['ASANA_SECRET']
PROJECT_ID = '1140949342574617'

Task = namedtuple('Task', ['gid', 'name', 'assignee', 'notes', 'section', 'completed',
                           'category', 'difficulty', 'due', 'tags', 'url'])


class TasksCache():
    def __init__(self):
        self._lock = Lock()
        self._sections = []

    def populate(self):
        """Refreshes the cache"""
        tasks = get_tasks()
        grouped_by_section = groupby(tasks, lambda task: task.section)
        print("all sections created")

        with self._lock:
            self._sections = {key: list(section)
                              for key, section in grouped_by_section}
        print("cache fully populated")

    def get(self) -> Dict[str, List[Task]]:
        """Returns current contents from the cache"""
        # Force refresh if cache is empty
        self._lock.acquire()
        if not self._sections:
            self._lock.release()
            self.populate()
        else:
            self._lock.release()

        with self._lock:
            sections = self._sections
        return sections


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
    url = f'https://app.asana.com/0/{PROJECT_ID}/{gid}'

    assignee_option = record['assignee']
    assignee = '' if not assignee_option else assignee_option['name']

    section = record['memberships'][0]['section']['name']

    custom_fields = flatten_resources(record['custom_fields'], {})
    difficulty = custom_fields['difficulty']
    category = custom_fields['category']

    tags = [field['name'] for field in record['tags']]

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
client.options['fields'] = ['name', 'assignee.name', 'notes', 'completed',
                            'memberships.section.(name|value)', 'custom_fields.(type|enum_value|name)',
                            'tags.name', 'due_on']


def get_tasks():
    tasks = list(client.tasks.find_by_project(PROJECT_ID),)
    tasks = [create_task(task) for task in tasks]
    return tasks
