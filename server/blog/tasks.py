from .models import Entry, Feature
from .serializers import FeatureSerializer
from datetime import datetime, timedelta, timezone
from random import randint
from celery import shared_task
from celery.utils.log import get_task_logger


logger = get_task_logger(__name__)

@shared_task
def get_random_feature_task():
    filter_entries = Entry.objects.filter(submitted_date__gte=(datetime.now(timezone.utc) - timedelta(hours=24)))
    logger.info(filter_entries)

    num_entries = len(filter_entries)
    random_entry = filter_entries[randint(0, num_entries - 1)]
    logger.info(random_entry)

    feature = Feature(entry=random_entry, title=random_entry.title, body=random_entry.body)
    feature.save()
