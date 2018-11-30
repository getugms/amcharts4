/**
 * DateAxisBreak includes functionality to add breaks on a [[DateAxis]].
 *
 * A "break" can be used to "cut out" specific ranges of the axis scale, e.g.
 * weekends and holidays out of the Date-based axis.
 */

/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */

import { ValueAxisBreak, IValueAxisBreakProperties, IValueAxisBreakAdapters, IValueAxisBreakEvents } from "./ValueAxisBreak";
import { SpriteEventDispatcher, AMEvent } from "../../core/Sprite";
import { DateAxis } from "./DateAxis";
import { ITimeInterval } from "../../core/defs/ITimeInterval";
import { IDisposer, MutableValueDisposer } from "../../core/utils/Disposer";
import { registry } from "../../core/Registry";


/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */

/**
 * Defines properties for [[DateAxisBreak]].
 */
export interface IDateAxisBreakProperties extends IValueAxisBreakProperties {

	/**
	 * A `Date` break starts on.
	 *
	 * @type {Date}
	 */
	startDate?: Date;

	/**
	 * A `Date` break ends on.
	 *
	 * @type {Date}
	 */
	endDate?: Date;

}

/**
 * Defines events for [[DateAxisBreak]]
 */
export interface IDateAxisBreakEvents extends IValueAxisBreakEvents { }

/**
 * Defines adapters for [[DateAxisBreak]].
 *
 * @see {@link Adapter}
 */
export interface IDateAxisBreakAdapters extends IValueAxisBreakAdapters, IDateAxisBreakProperties { }


/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */

/**
 * Class used to define breaks for [[DateAxis]].
 *
 * A "break" can be used to "cut out" specific ranges of the axis scale, e.g.
 * weekends and holidays out of the Date-based axis.
 *
 * @see {@link IDateAxisBreakEvents} for a list of available events
 * @see {@link IDateAxisBreakAdapters} for a list of available Adapters
 * @important
 */
export class DateAxisBreak extends ValueAxisBreak {

	/**
	 * Defines available properties.
	 *
	 * @type {IDateAxisBreakProperties}
	 */
	public _properties!: IDateAxisBreakProperties;

	/**
	 * Defines available adapters.
	 *
	 * @type {IDateAxisBreakAdapters}
	 */
	public _adapter!: IDateAxisBreakAdapters;

	/**
	 * Defines available events.
	 *
	 * @type {IDateAxisBreakEvents}
	 */
	public _events!: IDateAxisBreakEvents;

	/**
	 * Defines the type of the Axis this break is used for.
	 *
	 * @type {ValueAxis}
	 */
	public _axisType: DateAxis;

	/**
	 * [gridInterval description]
	 *
	 * @ignore Exclude from docs
	 * @todo Description
	 * @type {ITimeInterval}
	 */
	public gridInterval: ITimeInterval;

	/**
	 * [gridDate description]
	 *
	 * @ignore Exclude from docs
	 * @type {Date}
	 * @todo Description
	 */
	public gridDate: Date;

	/**
	 * Constructor
	 */
	constructor() {
		super();
		this.className = "DateAxisBreak";
		this.applyTheme();
	}

	/**
	 * Starting date for the break.
	 *
	 * @param {Date} value Start date
	 */
	public set startDate(value: Date) {
		if (this.setPropertyValue("startDate", value)) {
			this.startValue = value.getTime();
			if (this.axis) {
				this.axis.invalidate();
				this.axis.invalidateSeries();
			}
		}
	}

	/**
	 * @return {Date} Start date
	 */
	public get startDate(): Date {
		return this.getPropertyValue("startDate");
	}

	/**
	 * Ending date for the break.
	 *
	 * @param {Date} value End date
	 */
	public set endDate(value: Date) {
		if (this.setPropertyValue("endDate", value)) {
			this.endValue = value.getTime();
			if (this.axis) {
				this.axis.invalidate();
				this.axis.invalidateSeries();
			}
		}
	}

	/**
	 * @return {Date} End date
	 */
	public get endDate(): Date {
		return this.getPropertyValue("endDate");
	}

}

/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["DateAxisBreak"] = DateAxisBreak;
