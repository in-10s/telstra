package com.in10s.bean;

public class ChildParentBean {
	private String country_name;
	private String state_name;
	private String capital_name;
	private Integer continent_id;
	private Integer country_id;
	private Integer state_id;

	public String getCapital_name() {
		return capital_name;
	}

	public void setCapital_name(String capital_name) {
		this.capital_name = capital_name;
	}

	public String getCountry_name() {
		return country_name;
	}

	public void setCountry_name(String country_name) {
		this.country_name = country_name;
	}

	public String getState_name() {
		return state_name;
	}

	public void setState_name(String state_name) {
		this.state_name = state_name;
	}

	public Integer getContinent_id() {
		return continent_id;
	}

	public void setContinent_id(Integer continent_id) {
		this.continent_id = continent_id;
	}

	public Integer getCountry_id() {
		return country_id;
	}

	public void setCountry_id(Integer country_id) {
		this.country_id = country_id;
	}

	public Integer getState_id() {
		return state_id;
	}

	public void setState_id(Integer state_id) {
		this.state_id = state_id;
	}
 

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((capital_name == null) ? 0 : capital_name.hashCode());
		result = prime * result + ((continent_id == null) ? 0 : continent_id.hashCode());
		result = prime * result + ((country_id == null) ? 0 : country_id.hashCode());
		result = prime * result + ((country_name == null) ? 0 : country_name.hashCode());
		result = prime * result + ((state_id == null) ? 0 : state_id.hashCode());
		result = prime * result + ((state_name == null) ? 0 : state_name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ChildParentBean other = (ChildParentBean) obj;
		if (capital_name == null) {
			if (other.capital_name != null)
				return false;
		} else if (!capital_name.equals(other.capital_name))
			return false;
		if (continent_id == null) {
			if (other.continent_id != null)
				return false;
		} else if (!continent_id.equals(other.continent_id))
			return false;
		if (country_id == null) {
			if (other.country_id != null)
				return false;
		} else if (!country_id.equals(other.country_id))
			return false;
		if (country_name == null) {
			if (other.country_name != null)
				return false;
		} else if (!country_name.equals(other.country_name))
			return false;
		if (state_id == null) {
			if (other.state_id != null)
				return false;
		} else if (!state_id.equals(other.state_id))
			return false;
		if (state_name == null) {
			if (other.state_name != null)
				return false;
		} else if (!state_name.equals(other.state_name))
			return false;
		return true;
	}

}
